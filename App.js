import React from 'react';
import Todo from './Todo';
import './App.css';
import {call} from './ApiService';
import Response from './Response'

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.getValue = this.getValue.bind(this);
    this.state = {
      item:{id:1, title: "Hello world", done: true},
      items:[],
      parsedItem:{},
      count:0,
      enteredValue: ""
    };
  }
  handleChange(event) {
    this.setState({ enteredValue: event.target.value }); // 입력값이 변경될 때마다 상태 업데이트
  }
  
  render() {
    // var todoitems = this.state.items?.map((item, idx) => (
    //   <Todo item= {item} key= {item.id} />
    // ));
  // var tempValue;

  const showFullData = () => {
    const res = JSON.stringify(this.state.parsedItem)
    this.setState({count: this.state.count + 1})
    this.setState({items: res})
    // console.log(tempValue)
  }

  function callPatient () {
    var inputElement = 123;
  //  var inputValue = inputElement.value
  //   this.setState({items: this.state.item})
  //   console.log(inputValue)
    console.log(inputElement)
  }

    return  <div className='App'>
       <Todo item = {this.state.item} />
       <h1>요청 횟수: {this.state.count}</h1>
       {/* <br> </br> */}
       { <h3>요청 결과: </h3>}
       <h3> {this.state.items}</h3> 
       {/* <Response re = {this.state.items}/> */}


       <button onClick={showFullData} className='Button'> 전체 환자 데이터 보여주기 </button>
       <br></br>
       <label> ID 입력 </label>
       <input
        type="text"
        value={this.state.enteredValue}
        onChange={this.handleChange.bind(this)}
      />
      <button onClick={() => {
        this.setState({count: this.state.count + 1})

        var temp = this.state.enteredValue;
        const res = this.state.parsedItem;
        var tempResult;
        console.log(res[0].id);
        for( let i = 0; i < 12; i++ ){
          if(res[i].id == temp) {
           tempResult = res[i];
           break;
          }
          else
           tempResult = "noData"
        }

        console.log(tempResult);
        this.setState({items: JSON.stringify(tempResult)});
        console.log(temp); }}>
        Get Value
      </button>
            </div>
        
  }

  async fetchData() {
    try {
      const response = await call("/emr/patients", "GET", null)
      const res = JSON.stringify(response)
      const resParse = JSON.parse(res)
      this.setState({parsedItem: resParse})
      console.log("mount")
      console.log(resParse)
      console.log(res)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  componentDidMount() {
    this.fetchData();
    // call("/emr/patients", "GET", null, (response) => {
    //   this.setState({ items: response.data });
    //   console.log(response)
    // }, (error) => {
    //   console.error("Error fetching data:", error);
    // });
    // console.log("mount")
  }

  add = (item) => {
    call("/emr/patients", "POST", item).then((response) =>
    this.setState({items: response.data})
    );
  }

  update = (item)=> {
    call("emr/patients", "PUT", item).then((response)=>
    this.setState({item: response.data})
    );
  }
}

export default App;