import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { DataSet, Network, Options } from 'vis-network/standalone';
import { Node as VisNode } from 'vis-network/standalone';
import { Edge as VisEdge } from 'vis-network/standalone';

@Component({
  selector: 'app-vis',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.css']
})
export class VisComponent implements AfterViewInit {
  @ViewChild("siteConfigNetwork") networkContainer: ElementRef;

  public scalingEnabled: boolean;
  public network: Network;
  public visNodes: DataSet<VisNode> = new DataSet();
  public visEdges: DataSet<VisEdge> = new DataSet();

  constructor() { }

  ngAfterViewInit() {
    this.loadVisTree();
  }

  updateScaling() {

/*
    const scalingOpt = this.scalingEnabled ? {
          label: {
            enabled: this.scalingEnabled,
            min: 10,
            max: 30,
            maxVisible: 1000,
            drawThreshold: 0
        }
    } : {
          label: false
    }
*/

  const scalingOpt = {
          label: {
            enabled: this.scalingEnabled,
            min: 10,
            max: 30,
            maxVisible: 1000,
            drawThreshold: 0
        }
  };

    this.network.setOptions(
      {
      nodes: {
        scaling: scalingOpt
      }
      }
      );
      this.visNodes.update(
        this.visNodes.map(node => {
          node.scaling = scalingOpt
          console.log(node.id, node.value, node.scaling.label);
        return node;
      }));
  }

  loadVisTree() {  

    this.visNodes = new DataSet<VisNode>([
        {id: 1, label: 'Node 1', shape: 'dot', title: 'I am node 1!', value:45, size: 45},
        {id: 2, label: 'Node 2', shape: 'dot',  title: 'I am node 2!', value:35, size: 35},
        {id: 3, label: 'Node 3', shape: 'dot', value: 25},
        {id: 4, label: 'Node 4', shape: 'dot', value: 25},
        {id: 5, label: 'Node 5', shape: 'dot', value: 25}
    ]);

    // create an array with edges
    this.visEdges = new DataSet<VisEdge>([
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5}
    ]);

    const data = {
      nodes: this.visNodes,
      edges: this.visEdges
    };
/*
    const options = {
      nodes : {
        font: {
          size: 18
        },
      scaling: {
          label: {
            enabled: true,
            min: 10,
            max: 30,
            maxVisible: 1000,
            drawThreshold: 0
          }
        }
      }
    }
    */
    const options = {};

    this.network = new Network(this.networkContainer.nativeElement, data, options);

      this.visNodes.update(this.visNodes.map(node => node));
      
      this.visEdges.update(this.visEdges.map(edge => edge));
  }
}