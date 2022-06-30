import { getAllFiles } from "../explorer/utils";


/** @type {import('./__types/demo').RequestHandler} */
export async function get() {

    //browse the actual repo to find svelte components, starting from the comp dir, only first level
    const components:App.ComponentMeta[]=getAllFiles('./src/comp/',[],{recursive:false,validExt:/\.svelte/});
   
    if (components) {
      return {
        body: { components }
      };
    }
   
    return {
      status: 404
    };
  }

