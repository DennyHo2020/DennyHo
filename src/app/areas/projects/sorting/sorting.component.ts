import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

    public height = 700;
    public width = 700;

    public data: number[] = [];
    public sorted: number[] = [];
    public rects: any;
    public yScale: any;
    public length = 40;

    public reset = false;
    public inProgress: boolean = false;

    constructor() { }

    ngOnInit(): void {
        // Create array of rectangle length values
        for (let i = 0; i < this.length; i++) {
            var val = Math.floor(Math.random() * this.height + 1);
            while (this.data.includes(val)) {
                val = Math.floor(Math.random() * this.height + 1);
            }
            this.data.push(val);
        }

        this.reset = false;

        // Create rects using d3 join and data array
        d3.select("#vis1").append("svg").attr("width", this.width).attr("height", this.height);
        this.rects = d3.select("#vis1")
            .select("svg")
            .selectAll("rect")
            .data(this.data).enter()
            .append("rect");

        // Y axis scale
        this.yScale = d3.scaleLinear()
            .domain([0, this.length])
            .range([0, this.height]);

        this.update();
    }
  
    // Updates the rectangle attributes
    public update() {    
        this.rects.attr("width", function(val: any) { 
            return Math.ceil(val);
        })
        .attr("height", (val: any) => { 
            return Math.ceil(this.height / this.data.length); 
        })
        .attr("id", function(d: any) {
            return "rect" + d
        })
        .attr("x", function(val: any) { 
            return Math.ceil(0); 
        })
        .attr("y", function(val: any, i: any) { 
            return 0; 
        })
        .attr("transform", (d: any, i: any) => {
            var val = this.yScale(i);
            return `translate(${0},${val})`;
        })
        .attr("fill", function(val: any) {
            return d3.lab(80, -60, 0);
        })
        .attr("stroke", "white")
        .attr("stroke-width", .5)
        .attr("shape-rendering","crispEdges")
    }

    public resetData() {
        this.reset = true; 
        this.data = [];
        this.sorted = [];
        // Create array of rectangle length values
        for (let i = 0; i < this.length; i++) {
            var val = Math.floor(Math.random() * this.height + 1);
            while (this.data.includes(val)) {
                val = Math.floor(Math.random() * this.height + 1);
            }
            this.data.push(val);
        }             
        // Rebind rects to new data and transition to new positions
        this.rects.data(this.data)
            .attr("class", "")                
            .transition().duration(2000)
            .attr("width", function(val: number) { 
                return Math.ceil(val);
            })
            .attr("id", function(d:any) {
                return "rect" + d
            })
            .attr("transform", (d:any, i:any) => {return `translate(${0},${this.yScale(i)})`});
        this.reset = false;
    }

    public insertionSort() {
        this.inProgress = true;

        var value = this.data.shift() ?? 0;
        this.sorted.push(Number(value));      
        var self = this;

        // sortHelper handles sorting the new value into the sorted list
        var sortHelper = (n: number) => {
            if (self.reset) {
                self.reset = false;
                return;
            }
            
            d3.selectAll("rect").attr("class", "")                
            d3.select("#rect" + value).attr("class", "testing")
            
            // New value is less than current element in sorted 
            if (n > 0 && self.sorted[n-1] > value) {
                d3.timeout(function() {
                    self.sorted.splice(n,1); // Remove value from end
                    self.sorted.splice(n-1,0,value); // Insert value at n-1

                    // Swap svg rects
                    self.swap(self.sorted[n], n);
                    self.swap(self.sorted[n-1], n-1);

                    // Recurse to keep inserting downwards
                    sortHelper(--n)
                }, 10 * 2);
            } 
            else if (self.data.length) {
                // Data is still not fully sorted
                d3.timeout(function() {self.insertionSort()}, 10 * 2);
            } 
            else {
                // Data fully sorted
                d3.selectAll("rect").attr("class", "");
                this.inProgress = false;
            }
        }

        sortHelper(this.sorted.length-1);
    }

    // Bubble Sort sorts by bubbling up values until the list is sorted
    public bubbleSort() {
        // All data has been sorted
        if (!this.data.length) {
            this.inProgress = false;
            return;
        }

        // Bubble up values from the begining 
        this.inProgress = true;
        this.bubbleHelper(1);
    }

    private bubbleHelper(i: number) {
        if (this.reset) {
            this.reset = false;
            return;
        }
        
        // All data has been sorted
        if (!this.data.length) {
            this.inProgress = false;
            return;
        }
        
        // Bubble Up to End of Data
        if (i <= this.data.length) {
            // Check whether to bubble value up
            if (this.data[i] < this.data[i-1]) {

                d3.select("#rect" + this.data[i]).attr("class", "testing");
                
                d3.timeout(() => {
                                d3.select("#rect" + this.data[i]).attr("class", "");
                                d3.select("#rect" + this.data[i-1]).attr("class", "");                                         
                            }, 
                            10);

                // Swap values in Data
                var temp = this.data[i-1];
                this.data[i-1] = this.data[i];
                this.data[i] = temp;

                // Swap svg rects
                this.swap(this.data[i], i);
                this.swap(this.data[i-1], i-1);

                d3.timeout(() => {return this.bubbleHelper(++i)}, 10);
            }  
            else if (i == this.data.length) {
                // Bubbled to end, remove element
                this.data.pop();
                this.bubbleHelper(++i);
            } 
            else {
                // Bubble up next val instead               
                this.bubbleHelper(++i);
            }
        } 
        else {
            // Bubble up from beggining
            this.bubbleSort();
        }
    }

    public selectionSort() {
        this.inProgress = true; 
        var min = this.width + 1; 
        var spliceIndex: number;
        var i = 0;

        // Look for min to insert into sorted partition
        var findMin = () => {
            d3.timeout(() => {
                // Keep recursing to find min until end of array
                if (i <= this.data.length) {
                    d3.select("#rect" + this.data[i]).attr("class", "testing")

                    d3.timeout(() =>  {
                        d3.select("#rect" + this.data[i]).attr("class", "");

                        // Update new min value
                        if (this.data[i] < min) {
                            d3.select("#rect" + this.data[i]).attr("class", "min")
                            d3.select("#rect" + min).attr("class", "")
                            min = this.data[spliceIndex = i]
                        }
                        i++;

                        // Recurse to check if next value is min
                        d3.timeout(function() {return findMin()}, 10/2);

                    }, 10/2);

                } 
                else {
                    // End of array reached
                    this.sorted.push(min);
                    this.data.splice(spliceIndex,1);

                    // Transform min rect that was found to sorted position
                    this.rects.transition()
                        .duration(10 * 4)
                        .attr("transform", (d: any) => {
                            var y;
                            if (this.sorted.indexOf(d) > -1) {
                                y = this.sorted.indexOf(d);
                            }
                            else {
                                y = this.data.indexOf(d) + this.sorted.length;
                            }
                            return `translate(${0},${this.yScale(y)})`;
                        })
                        this.rects.attr("class", "")

                    // Keep recursing until all values are sorted
                    d3.timeout(() => {
                        if (this.data.length > 0) this.selectionSort();
                    }, 10);

                    this.inProgress = false;

                    return;
                }                
            })
        }

        findMin();
    }

    // Transition svg rect 'd' to new 'i' position
    private swap(d:any, i:number) {
        console.log(i);
        d3.select("#rect" + d)
            .transition().duration(10)
            .attr("transform", (d) => {
                var val = this.yScale(i);
                return `translate(${0},${val})`
            })               
    }
}
