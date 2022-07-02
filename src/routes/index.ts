import { getAllFiles } from "../explorer/utils";


/** @type {import('./__types/index').RequestHandler} */
export async function get() {

    //browse the actual repo to find svelte components, starting from the comp dir, only first level
    const components:App.ComponentMeta[]=getAllFiles('./src/comp/',[],{recursive:false,validExt:/\.svelte/});
   //console.log(components)
    if (components) {
      return {
        body: { components }
      };
    }
   
    return {
      status: 404
    };
  }

