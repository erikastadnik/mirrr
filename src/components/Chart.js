import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import store from '../store' 
import { parse } from '../modules/dataParse'

import {hardcodedLabels, hardcodedFrequencies} from '../hardcoded'

const colours = {
  black: "#000000",
  fill: "#F1F6F9",
  selection: "#9BA4B4",
  text: "#14274E"
}


const Chart = () => {
  const svgRef = useRef()



  const data = store.getState().data
  const parsedData = parse(data)

  const labels = parsedData.map(x => x[0])
  const frequencies = parsedData.map(x => x[1])

  //console.log(labels.splice(0,100))
  //console.log(frequencies.splice(0,100))

  const largestFrequency = frequencies[0]

 

  let obj = []

  
  for (let i = 0; i < labels.length; i++){
    const newObj = {
      name: labels[i],
      frequency: frequencies[i]
    }
    obj.push(newObj)
  }

  //obj = obj.filter(item => item.frequency > 1)

  console.log(obj.length)

  const hexToRGB = (h, opacity) => {
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    
    return "rgb("+ +r + "," + +g + "," + +b + "," + opacity +")";
  }


  useEffect(()=> {
    //setting up svg
    const width = 2000
    const height = 100
    const transitionLength = 100
    //const bubbleIncrease = 1.1

    const radius = (d) => {
      const area = d.frequency
      const radius = Math.sqrt(area/Math.PI)
      return radius*10
    }


    //zoom
    function handleZoom(e) {
      d3.select('svg g')
        .attr('transform', e.transform);
    }
    let zoom = d3.zoom()
      .on('zoom', handleZoom)

    
    //creating the svg
    const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", [0, 0, width, height])
            .call(zoom)
 
    //creating the nodes
    const node = svg.append("g")
                    .selectAll("circle")
                    .data(obj)
                    .enter()

    const tooltip = d3.select("div")
                      .append("text")
                      .style("position", "absolute")
                      .style("visibility", "hidden")
                      .style("width", "auto")
                      .style("border-radius", "4px")
                      .style("height", "auto") 
                      .style("background", hexToRGB(colours.fill, 0.9)) 
                      .style("border-width", "1px")
                      .style("border-style", "solid")
                      .style("border-color", colours.selection)
                      .style("padding", "5px 10px")
                      .style("font-size", "14px")
                      .style("font-family", "monospace")
                      .style("color", colours.text)
                         
                      
    const tooltipText = (a, b) => {
      const text = `"${a}" appears ${b} times`
      return text
    }
    
                  
         
    //appending circles to nodes
    const circle = node.append("circle")
          .attr("r", d => radius(d))
          .attr("fill", colours.fill)
          //.attr("stroke", colours.primary)
          //.attr("opacity", 0.9)
          //.style("stroke-width", 4)
          .on("mouseover", function(e, i, d) {
            let index = i.index
            let name = obj[index].name
            let frequency = obj[index].frequency
            tooltip.style("visibility", "visible")
            .text(tooltipText(name, frequency))
            d3.select(this)
              .transition()
              .duration(transitionLength)
              .attr("fill", colours.selection)
              
              //.attr("r", d => d.frequency/7*bubbleIncrease) 
              //this.parentNode.appendChild(this)
          //     obj[index].frequency = obj[index].frequency*bubbleIncrease
          //     simulation
          //        .nodes(obj)
          //        .on("tick", function(d){
          //        circle
          //           .attr("cx", d => d.x)
          //           .attr("cy", d => d.y)
          //        label
          //           .attr("x", d => d.x)
          //           .attr("y", d => d.y) 
          //     simulation.alphaTarget(0.2).restart()
          // })
          })
          .on("mousemove", function(e, i, d) {
            tooltip.style("top", (e.y-40)+"px").style("left",(e.x+20)+"px")

          })
          .on("mouseleave", function(e, i, d) {
            let index = i.index
            
            tooltip.style("visibility", "hidden")
            d3.select(this)
              .transition()
              .duration(transitionLength)
              .attr("fill", colours.fill)
              //.attr("r", d => d.frequency/7)
              // obj[index].frequency = obj[index].frequency/bubbleIncrease
              // simulation
              //    .nodes(obj)
              //    .on("tick", function(d){
              //    circle
              //       .attr("cx", d => d.x)
              //       .attr("cy", d => d.y)
              //    label
              //       .attr("x", d => d.x)
              //      .attr("y", d => d.y) 
              //     })
              //     simulation.alphaTarget(0.2).restart()
          })

    //appendind labels to nodes
    const label = node.append("text")
                 .attr("fill", colours.text)
                 .attr("font-size", d => radius(d)/3 + "px")
                 //.attr("font-family", "sans-serif")
                 .style("font-family", "monospace")
                 .style("text-anchor", "middle")
                 .style("text-anchor", "middle")
                 .attr("transform", d => "translate(0," + radius(d)/10 + ")" )
                 .text(d => d.name)
                 .on("mouseover", function(e, i, d) {
                  let index = i.index
                  let name = obj[index].name
                  let frequency = obj[index].frequency
                  tooltip.style("visibility", "visible")
                  .text(tooltipText(name, frequency))
                  d3.selectAll("circle")
                    .filter(function (d, i) { return i === index})
                    .transition()
                    .duration(transitionLength)
                    .attr("fill", colours.selection)
                    //.attr("r", d => d.frequency/7*bubbleIncrease) 
                    //this.parentNode.appendChild(this)
                //     obj[index].frequency = obj[index].frequency*bubbleIncrease
                //     simulation
                //        .nodes(obj)
                //        .on("tick", function(d){
                //        circle
                //           .attr("cx", d => d.x)
                //           .attr("cy", d => d.y)
                //        label
                //           .attr("x", d => d.x)
                //           .attr("y", d => d.y) 
                //     simulation.alphaTarget(0.2).restart()
                // })
                })
                .on("mousemove", function(e, i, d) {
                  tooltip.style("top", (e.y-40)+"px").style("left",(e.x+20)+"px")
                })
                .on("mouseleave", function(e, i, d) {
                  let index = i.index
                  
                  tooltip.style("visibility", "hidden")
                  d3.selectAll("circle")
                    .transition()
                    .duration(transitionLength)
                    .attr("fill", colours.fill)
                    //.attr("r", d => d.frequency/7)
                    //obj[index].frequency = obj[index].frequency/bubbleIncrease
                    // simulation
                    //    .nodes(obj)
                    //    .on("tick", function(d){
                    //    circle
                    //       .attr("cx", d => d.x)
                    //       .attr("cy", d => d.y)
                    //    label
                    //       .attr("x", d => d.x)
                    //      .attr("y", d => d.y) 
                    //     })
                    //     simulation.alphaTarget(0.2).restart()
                })
                 

         
    const simulation = d3.forceSimulation(obj)
          .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
          .force("charge", d3.forceManyBody().strength(0.01)) // Nodes are attracted one each other of value is > 0
          .force("collide", d3.forceCollide().strength(0.5).radius(function(d) {return radius(d) + 2}).iterations(1)) // Force that avoids circle overlapping
  
          simulation
          .nodes(obj)
          .on("tick", function(d){
            circle
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
            label
                .attr("x", d => d.x)
                .attr("y", d => d.y) 
          })   

  }, [obj])



  return (
  <div className="h-full p-0">
    <svg ref={svgRef} >
    </svg>
        
  </div>
  )
}

export default Chart