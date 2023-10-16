import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



class News extends Component {
 static defaultProps ={
      country : 'in',
      pageSize : 5,
      category : 'general'
    }
    static propTypes ={
      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string
    }
    constructor(props){
        super(props);
        this.state ={
            articles : [],
            loading :true,
            page:1,
            totalResults: 0
          
        }
         document.title = `${this.props.category} - NewsIn`;
    }
    async updateNews(){
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
          let data = await fetch(url);
          this.props.setProgress(30);
          let parsedData = await data.json();
          this.props.setProgress(70);
          console.log(parsedData);
          this.setState({articles : parsedData.articles, totalResults: parsedData.totalResults,
          loading:false,

        
        } );
        this.props.setProgress(100);
      

    }
   async componentDidMount(){
   this.updateNews();

    } 

    handlePrevClick =async  ()=>{
  this.setState({page: this.state.page - 1});
  this.updateNews();
      }

     handleNextClick = async()=>{
    this.setState({page: this.state.page + 1});
    this.updateNews();
    }

    fetchMoreData = async () => {
      this.setState({page : this.state.page + 1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
          let data = await fetch(url);
          let parsedData = await data.json();
          console.log(parsedData);
          this.setState({articles : this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults,
          loading:false,

        
        } )
    };

   
  render() {
    return (

      // <div className='container my-3'>
      <>
        <h1 className="text-center" style={{margin :'40px 0px'}}>NewsIn - Top   {this.props.category} Headlines</h1>
       {this.state.loading && <Spinner/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}

          style={{overflow:"hidden"}}
        >
          <div className="container">
        <div className="row">
        { this.state.articles?.map((element)=>{
            return <div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title?element.title:""} description ={element.description?element.description: ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author}
        date={element.publishedAt} />
            
            </div>
            
        })}
        
         </div>
         </div>
         </InfiniteScroll>
         </>
        
    )
  }
}

export default News;