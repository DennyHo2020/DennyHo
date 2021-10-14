import { Component } from '@angular/core';
import { iris } from './iris';
import * as d3 from 'd3';

@Component({
  selector: 'parallel-coordinates',
  templateUrl: './parallel-coordinates.component.html',
  styleUrls: ['./parallel-coordinates.component.scss']
})
export class ParallelCoordinates {
    public data = iris;

    // dims will store the four axes in left-to-right display order
    public dims: string[] = [
        "sepalLength",
        "sepalWidth",
        "petalLength",
        "petalWidth"
    ];

    // mapping from dimension id to dimension name used for text labels
    public dimNames: {[key: string] : string} = {
        "sepalLength": "Sepal Length",
        "sepalWidth": "Sepal Width",
        "petalLength": "Petal Length",
        "petalWidth": "Petal Width",
    };

    public width = this.dims.length * 125;
    public height = 500;
    public padding = 50;

    public svg: any;

    public xScale = d3.scalePoint()
        .domain(this.dims)
        .range([this.padding, this.width - this.padding]);
    
    public yScales: { [id: string] : any; }  = {};
    public axes: { [id: string] : any; } = {};
    public brushes: { [id: string] : any; } = {};
    public brushRanges: { [id: string] : any; } = {};

    ngOnInit() {
        this.svg = d3.select("#pcplot")
            .append("svg")
            .attr("width", this.width).attr("height", this.height);

        this.initDimensions();
        this.addPlots();
    }

    private initDimensions() {
        // For each dimension, we will initialize a yScale, axis, brush, and
        // brushRange
        this.dims.forEach(dim => {
            //create a scale for each dimension
            this.yScales[dim] = d3.scaleLinear()
                .domain( d3.extent(this.data, (datum: any) => { return datum[dim] }) as any)
                .range( [this.height-this.padding, this.padding] );
        
            //set up a vertical axist for each dimensions
            this.axes[dim] = d3.axisLeft(this.yScales[dim])
                .ticks(10);
            
            //set up brushes as a 20 pixel width band
            //we will use transforms to place them in the right location
            this.brushes[dim] = d3.brushY()
                .extent([[-10, this.padding], [+10, this.height - this.padding]]);
            
            //brushes will be hooked up to their respective updateBrush functions
            this.brushes[dim]
                .on("brush", this.updateBrush(dim))
                .on("end", this.updateBrush(dim))
        
            //initial brush ranges to null
            this.brushRanges[dim] = null;
        });
    }

    private addPlots() {
        ////////////////////////////////////////////////////////////////////////
        // Make the parallel coordinates plots 
        
        // add the actual polylines for data elements, each with class "datapath"
        this.svg.append("g")
            .selectAll(".datapath")
            .data(this.data)
            .enter()
            .append("path")
            .attr("class", "datapath")
            .attr("d", (d: any) => {
                return d3.line()([
                [this.xScale(this.dims[0]) as number, this.yScales[this.dims[0]](d[this.dims[0]]) as number], 
                [this.xScale(this.dims[1]) as number, this.yScales[this.dims[1]](d[this.dims[1]]) as number], 
                [this.xScale(this.dims[2]) as number, this.yScales[this.dims[2]](d[this.dims[2]]) as number], 
                [this.xScale(this.dims[3]) as number, this.yScales[this.dims[3]](d[this.dims[3]]) as number]]);
            })
            .attr("stroke", (d: any): any => {
                if (d["species"] == "virginica") return d3.lab(65, 35,35); 
                else if (d["species"] == "versicolor") return d3.lab(50, 20, -40); 
                else if (d["species"] == "setosa") return d3.lab(65, -60, 0);
            })
            .attr("stroke-opacity", .75)
            .attr("fill", "none");
        
        
        // add the axis groups, each with class "axis"
        this.svg.selectAll(".axis")
            .data(this.dims)
            .enter()
            .append("g")
            .attr("class", "axis")            
            .attr("transform", (d: any) => {
              return `translate(${this.xScale(d)},${0})`
            })
            .each((d: any, i: any, n: any) => {
              return d3.select(n[i]).call(this.axes[d]);
            });
        
        // add the axes labels, each with class "label"
        this.svg.selectAll(".label")
            .data(this.dims)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("y", this.padding / 2)
            .attr("x", 0)
            .attr("transform", (d: any) => {
              return `translate(${this.xScale(d)},${0})`
            })
            .style("text-anchor", "middle")
            .style("cursor", "pointer")
            .on("click", (d: any) => { this.onClick(d)})
            .text(function(d: any) {
                return d;
            });
        
        // add the brush groups, each with class ".brush" 
        this.svg.selectAll(".brush")
            .data(this.dims)
            .enter()
            .append("g")
            .attr("class", "brush")
            .attr("transform", (d: any) => {
              return `translate(${this.xScale(d)},${0})`
            })
            .each((d: any, i: any, n: any) => {
              return d3.select(n[i]).call(this.brushes[d]);
            });
    }

    // Callback for swaping axes when a text label is clicked.
public onClick(d: any) {
    // Swap the labels in dims
    for (let i = 0; i < this.dims.length; i++) {
      if (d == this.dims[i]) {
        if (i != this.dims.length - 1) {
          var temp = this.dims[i];
          this.dims[i] = this.dims[i+1];
          this.dims[i+1] = temp; 
        }
        else {
          var temp = this.dims[i];
          this.dims[i] = this.dims[i-1];
          this.dims[i-1] = temp;
        }
        break;
      }
    }
  
    // Update xScale to match new dims
    this.xScale = d3.scalePoint()
      .domain(this.dims)
      .range([this.padding, this.width - this.padding]);
  
    // Rebind axes
    this.svg.selectAll(".axis")
      .transition()
      .duration(1000)
      .attr("transform", (d: any) => {
        return `translate(${this.xScale(d as any)},${0})`
      });
  
    // Rebind labels
    this.svg.selectAll(".label")
      .transition()
      .duration(1000)
      .attr("transform", (d: any) => {
        return `translate(${this.xScale(d as any)},${0})`
      });
      
    // Rebind paths
    this.svg.selectAll(".datapath")
      .transition()
      .duration(1000)
      .attr("d", (e: any) => {
        return d3.line()([
            [this.xScale(this.dims[0]) as any, this.yScales[this.dims[0]](e[this.dims[0]]) as any], 
            [this.xScale(this.dims[1]) as any, this.yScales[this.dims[1]](e[this.dims[1]]) as any], 
            [this.xScale(this.dims[2]) as any, this.yScales[this.dims[2]](e[this.dims[2]]) as any], 
            [this.xScale(this.dims[3]) as any, this.yScales[this.dims[3]](e[this.dims[3]]) as any]]);
    });
  
    // Rebind brushes
    this.svg.selectAll(".brush")
      .transition()
      .duration(1000)
      .attr("transform", (d: any) => {
        return `translate(${this.xScale(d as any)},${0})`
      });
  }
  
  // Returns a callback function that calls onBrush() for the brush
  // associated with each dimension
  public updateBrush(dim: any) {
    return () => {
      this.brushRanges[dim] = d3.event.selection;
      this.onBrush();
    };
  }
  
  // Callback when brushing to select elements in the PC plot
  public onBrush() {
    let allPaths = d3.selectAll(".datapath");
  
    // Select paths within brush range
    var isSelected = (s: any) => {
      let i;
      for (i = 0; i < this.dims.length; i++) {
        let brush = this.brushRanges[this.dims[i]];
  
        if (brush !== null) {
          let scale = this.yScales[this.dims[i]];
          let min = scale.invert(brush[0]);
          let max = scale.invert(brush[1]);
  
          if (s === null) {
            return false;
          }
          if (s[this.dims[i]] > min || s[this.dims[i]] < max) {
            return false;
          }
        }
      }
  
      return true;
    }
  
    let selected = allPaths
      .filter(isSelected);
    let notSelected = allPaths
      .filter(function(d) { return !isSelected(d); });
  
    // Update the style of the selected and not selected data
    selected.attr("stroke-opacity", .75);
    notSelected.attr("stroke-opacity", .1);
  }
}
