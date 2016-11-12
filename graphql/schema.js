import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  mutationWithClientMutationId,
  globalIdField,
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay';

import rp from "request-promise";



let schema = (db) => {
  class Data {};
  let data = new Data();

  let nodeDefs = nodeDefinitions(
    (globalId) => {
      let {type} = fromGlobalId(globalId);
      if (type === 'Data') {
        return data;
      }
      return null;
    },
    (obj) => {
      if (obj instanceof Data) {
        return dataSchema;
      }
      return null;
    }
  );

  let dataSchema = new GraphQLObjectType({
    name: "Data",
    fields: () => ({
      id: globalIdField("Data"),
      senators: {
        type: new GraphQLList(senatorType),
        args: {
          zipcode: { type: GraphQLString }
        },
        resolve: (__, args) => {
          return args.zipcode ? new Promise((resolve, reject) => {
            rp({
              method: "POST",
              uri: "http://localhost:8000/api/find_senator",
              body: { zipcode: args.zipcode },
              json: true
            })
            .catch(error => {
              reject(error)
            })
            .then(data => {
              resolve(data.results);
            })
          }) : null;
        }
      },
      congressmen: {
        type: new GraphQLList(congresspersonType),
        args: {
          zipcode: { type: GraphQLString }
        },
        resolve: (__, args) => {
          return args.zipcode ? new Promise((resolve, reject) => {
            rp({
              method: "POST",
              uri: "http://localhost:8000/api/find_congressperson",
              body: { zipcode: args.zipcode },
              json: true
            })
            .catch(error => {
              reject(error)
            })
            .then(data => {
              resolve(data.results);
            })
          }) : null;
        }
      },
    }),
    interfaces: [nodeDefs.nodeInterface]
  })

  let senatorType = new GraphQLObjectType({
    name: "Senator",
    fields: () => ({
      firstName: { type: GraphQLString, resolve: senator => { console.log(senator); return senator.first_name} },
      lastName: { type: GraphQLString, resolve: senator => senator.last_name },
      bioID: {type: GraphQLString, resolve: senator => senator.bioguide_id}
    })
  })

 let congresspersonType = new GraphQLObjectType({
    name: "Congressperson",
    fields: () => ({
      name: { type: GraphQLString, resolve: congressperson => { console.log(congressperson); return congressperson.name} },
      bioID: {type: GraphQLString, resolve: congressperson => congressperson.bioguide_id}
    })
  })


  let QueryType = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      node: nodeDefs.nodeField,
      data: {
        type: dataSchema,
        resolve: () => data
      },
    })
  });

  return new GraphQLSchema({
    query: QueryType
  });
}

export default schema;
