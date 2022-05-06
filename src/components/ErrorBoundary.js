import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getderivedStateFromError(error){
    return{
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo){
    console.log('Logging', error, errorInfo)
  }

  render(){
    if(this.state.hasError){
      return <h1>Data removed</h1>
    }
    return this.props.children

  }
}