import React, { Component, createRef } from 'react'
import * as d3 from 'd3';
import { curveCardinal } from 'd3';
import Search from './searchComponent';
import GraphMl_Dapa from './charts/graph_ml_dapa';


export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.myRef2=React.createRef();
        this.state={
            dataset:[{ x:0,'y':360},
            {'x':300,'y':100},
            {'x':410,'y':360}],

            dataset2:[{ x:0,'y':360},
            {'x':200,'y':50},
            {'x':410,'y':360}],
            isLoggedIn:true, 
           
        }
    }
    componentDidMount() {
        this.svg(this.state.dataset,this.myRef.current)
        this.svg(this.state.dataset2,this.myRef2.current)
    }   
    
    svg=(arraydata,ref)=>{
        const  margin = {top: 10, right: 30, bottom: 30, left: 60}
        let width =500-margin.left-margin.right;
        let height=400-margin.bottom-margin.top;

        ref.innerHTML='';
        let svg= d3.select(ref)
                    .append('svg')
                    .attr('width',width+margin.left+margin.right)
                    .attr('height',height+margin.left+margin.right)
                    .append('g')
                    .attr('transform','translate(30,30)');
       //x axis
        let x= d3.scaleLinear()
                .domain([0,200])
                .range([0,width]);
            svg.append('g')
                .attr('transform','translate(0,'+height+')')
                .call(d3.axisBottom(x).ticks(3));
        // x axis name
        svg.append('text')
            .attr('text-anchor','end')
            .attr('x',width)
            .attr('y',height+40)
            .text('dapa')
        //y axis
        let y =d3.scaleLinear()
                 .domain([2,0])
                 .range([0,height]);
            svg.append('g') 
                .call(d3.axisLeft(y).ticks(5));
        //y axis name
        svg.append('text')
            .attr('text-anchor','start')
            .attr('x',-20)
            .attr('y',-10)
            .text('ml')
        //line data
        const line =d3.line()
                    .curve(d3.curveCardinal)
                    .defined(d=>d!=null)
                    .x(d=>d.x)
                    .y(d=>d.y);
        //line 
        svg.append('path')
            .datum(arraydata)
            .transition()
            .duration(3000)
            .attr("d",line)
            .attr('fill','pink')
            .attr('stroke','green')
            .attr("stroke-width", 2.5)
        //line2
        // svg.append('path')
        //     .datum(this.state.dataset2)
        //     .attr("d",line)
        //     .attr('fill','none')
        //     .attr('stroke','pink')
        //     .attr("stroke-width", 1.5)
    }
    chartdata=(data1,data2)=>{
        const {dataset,dataset2}=this.state;
       if(data1) {
        let datacopy1=dataset;
        
        datacopy1.splice(1,1,data1[0]);
       
        console.log('data from',data1)
        this.setState({dataset:datacopy1,},()=>
            this.svg(this.state.dataset,this.myRef.current),
            )
       }
       if(data2) {
        let datacopy2=dataset2;
        datacopy2.splice(1,1,data2[0]);
        this.setState({dataset2:datacopy2},()=>
            this.svg(this.state.dataset2,this.myRef2.current)
            )
       }
        
    }
    render() {
      
        return (
            <>
                <div className='chart' ref={this.myRef}>  
                </div>
                <div id='chart2' ref={this.myRef2}></div>
                <Search   chartdata={this.chartdata}/>
                <div id='map'></div>
                <GraphMl_Dapa />
            </>
        )
    }
}
