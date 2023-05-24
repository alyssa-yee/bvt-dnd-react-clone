import React from 'react'
import { Component } from 'react';
import './DragAndDropBox.css'




export default class DragAndDropBox extends React.Component {
  state = {
    tasks: [
        {name:"Learn Angular", category:"wip", bgcolor: "red"},                       
        {name:"React", category:"wip", bgcolor:"pink"},
        {name:"Vue", category:"complete", bgcolor:"skyblue"}                
        ]
    
    };

  onDragStart = (ev, id) => {
          console.log('dragstart:',id);
          ev.dataTransfer.setData("id", id);
    }
  
  onDragOver = (ev) => {
          ev.preventDefault();
  }
  
  onDrop = (ev, category) => {
         let id = ev.dataTransfer.getData("id");
         
         let tasks = this.state.tasks.filter((task) => {
             if (task.name == id) {
                 task.category = category;
             }
             return task;

         });
  
         // updating state

         this.setState({
             ...this.state,
             tasks
         });
      }

render () {   
        
    var tasks = {backlog:[], wip: [], complete: [],}           
            
    this.state.tasks.forEach ((t) => {
        tasks[t.category].push(

            <div key={t.name}
            onDragStart={(e)=>this.onDragStart(e, t.name)} 
            draggable 
            className="draggable-item" 
            style={{backgroundColor: t.bgcolor}}>
            {t.name}
        </div>
        
        );});

        return (
        <div className="dnd-box-container" id="">

        <div className="row">

            {/* These columns will be turned into column components */}
            <div className="in-progress dnd-col"
                  onDragOver={(e)=> this.onDragOver(e)}
                  onDrop={(e)=> {this.onDrop(e, "backlog")}}>
                    <h1 className="task-header">BACKLOG</h1>
                  
                  {tasks.backlog}

            </div>
            
            {/* These columns will be turned into column components */}
              <div className="in-progress dnd-col"
                  onDragOver={(e)=> this.onDragOver(e)}
                  onDrop={(e)=> {this.onDrop(e, "wip")}}>
                    <h1 className="task-header">IN PROGRESS</h1>
                  
                  {tasks.wip}

            </div>

            {/* These columns will be turned into column components */}
            <div className="complete dnd-col" 
              onDragOver={(e)=> this.onDragOver(e)}
              onDrop={(e)=> {this.onDrop(e, "complete")}}>
                  <h1 className="task-header">COMPLETE</h1>
                  {tasks.complete}
            </div>


          </div>
        </div>  
        
        );
    
    } 
}
