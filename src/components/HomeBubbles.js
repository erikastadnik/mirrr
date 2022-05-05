import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

const colours = {
  black: "#000000",
  fill: "#F1F6F9",
  selection: "#9BA4B4",
  text: "#14274E"
}

    const width = 2000
    const height = 1000
    const transitionLength = 100
    const bubbleIncrease = 2


const HomeBubbles = () => {
  const svgRef = useRef()


  let obj = []


  for (let i =0; i<100; i++){
    obj.push(
      {
        radius: Math.random()*200,
        cx: (Math.random()*width),
        cy: (Math.random()*height)
      })
  }

  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  
  useEffect(()=> {
  
        
    //creating the svg
    const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", [0, 0, width, height])
          

    const circle = svg.selectAll("circle")
      .data(obj)
      .enter().append("circle")
      .attr("r", d => d.radius)
      .attr("cx", d => d.cx)
      .attr("cy", d => d.cy)
      .attr("fill", colours.fill)
      .on("mouseover", function(e, i, d) {
          let index = i.index
          
          d3.select(this)
            .transition()
            .duration(transitionLength)
            //.attr("fill", colours.fill)
            .attr("r", d => d.radius*bubbleIncrease) 
            obj[index].radius = obj[index].radius*bubbleIncrease
            simulation
               .nodes(obj)
               .on("tick", function(d){
               circle
                  .attr("cx", d => d.x)
                  .attr("cy", d => d.y)
            simulation.alphaTarget(1).restart()    
        })
        })
       
        .on("mouseleave", function(e, i, d) {
            let index = i.index
            d3.select(this)
              .transition()
              .duration(transitionLength)
              //.attr("fill", colours.selection)
              .attr("r", d => d.radius/bubbleIncrease)
              obj[index].radius = obj[index].radius/bubbleIncrease
              simulation
                 .nodes(obj)
                 .on("tick", function(d){
                 circle
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                  simulation.alphaTarget(0.2).restart()
          })
        })
         
        
     
    
         
     const simulation = d3.forceSimulation(obj)
           .force("center", d3.forceCenter().x(width/2).y(height/2)) // Attraction to the center of the svg area
           .force("charge", d3.forceManyBody().strength(0)) // Nodes are attracted one each other of value is > 0
           .force("collide", d3.forceCollide().strength(0.2).radius(function(d) {return d.radius + 10}).iterations(1)) // Force that avoids circle overlapping


           simulation
           .nodes(obj)
           .on("tick", function(d){
             circle
                 .attr("cx", d => d.x)
                 .attr("cy", d => d.y)
           })   
  }, [obj])



  return (
  <div className="h-full">
    <svg ref={svgRef} >
    </svg>
  </div>
  )
}

export default HomeBubbles