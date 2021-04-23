import React, { Component } from 'react'
import * as d3 from 'd3';
import Tree from 'react-tree-graph'
import 'react-tree-graph/dist/style.css'
export default class GraphMl_Dapa extends Component {
  
    render() {
      let data = {
        name: 'Parent',
        children: [{
          name: 'Child One'
        }, {
          name: 'Child Two'
        },
        {
          name: 'Child 3',
          children:[{
            name:'1'
          },{
            name:'2',
            children:[{
              name:'A'
            },{
              name:'B'
            }]
          }]
        }]
      };
      
      
        return (
            <Tree
            data={data}
            width={400}
            height={400}
            animated
            duration={1000}
            nodeShape="rect"
            nodeProps={{ rx: 3 }}
             />
        )
    }
}
