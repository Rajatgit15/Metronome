import React from 'react';
import ReactDOM from 'react-dom';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';


class Metronome extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMinute:4
           
        };
        this.click1 = new Audio(click1);
        this.click2= new Audio(click2);

        
    }

    startStop = ()=>{
        if(this.state.playing)
        {
            clearInterval(this.timer);
            this.setState({playing:false});
        }
        else{
            this.timer = setInterval(this.playClick, (60/this.state.bpm)*1000);
                this.setState(
                    {count:0,
                    playing: true
                    }, 
                    this.playClick
                );
        }
    }
            
       
playClick =()=>{
    const{count, beatsPerMinute} = this.state;
    if(count%beatsPerMinute===0)
    {
        this.click2.play();

    }
    else{
        this.click1.play();
    }
    this.setState(state => ({
        count: (state.count +1)% state.beatsPerMinute
    }));
}
    
    handleBpmChange = event =>{
        const bpm = event.target.value;
        if (this.state.playing) {
            // Stop the old timer and start a new one
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
        
            // Set the new BPM, and reset the beat counter
            this.setState({
              count: 0,
              bpm
            });
          } else {
            // Otherwise just update the BPM
            this.setState({ bpm });
          }
        }
        //here if we will use regular function instead of arrow function then the 'this'
       // binding would be lost when it get passed to the onChange handler in render
    
    render()
    {
        const{ playing, bpm} = this.state;

        return(
        <div className = "metronome">
                <div className = "bpm-slider">
                   <div>{bpm} BPM</div>
                   <input 
                   type = "range" 
                   min = "60"
                    max = "240" 
                    value = {bpm}
                    onChange={this.handleBpmChange}/>
                </div>
                <button onClick ={this.startStop}>
                    {playing ? 'Stop' :'Start'}
                </button>
         </div>
        );

    }

}


export default Metronome;

