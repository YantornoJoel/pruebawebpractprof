import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {format} from 'timeago.js'
import iconedit from '../logos/iconedit.svg'

export default class Index extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    this.getArticles()
    //console.log(this.state.articles)
  }



  getArticles= async () => {
    const res = await axios.get("http://localhost:3900/api/articles/");
    this.setState({articles: res.data.articles});
    console.log(res.data.articles)
  }


  deleteArticle = async (id) =>{
    await axios.delete('http://localhost:3900/api/article/' + id)
    this.getArticles();
}

  

  render() {
    
    return (
      <div className="card fondo  container mx-auto">
        

      <div className=" container ">
        <section id="content" className="container">
          
          <h2 className=" subheader mb-5 mt-5 ">
              Todos los productos
              <Link className="float-right btn btn-success btn-sm" to="/product">Añadir producto</Link>
          </h2>
          
          

  
          {
            this.state.articles.map(article => ( 
          
                   

                <div className="mb-5 mt-5 " id="article" key={article._id} >
             <article className="article-item" id="article-template"  > 
              <div className="image-wrap  ">
                <img src={article.image} alt="Producto"className=" d-flex" />
              </div>
              <h2 className="display-block ">{article.title}</h2>
              <h6 className="display-block">{article.content}</h6>

              <div className="funciones" >
            <button 
                                      className="btn btn-danger"
                                      id="btn-delete"
                                      onClick= {() => this.deleteArticle(article._id) }>
                                        X
                                  </button>
                                  <Link to={"/product/" + article._id}> 
                     <img src={iconedit} className="iconoedi" id="iconedit" alt="Imagen"/>    
                                   </Link>
              </div>

              <span className="date d-block float-right">{format(article.date)}</span>
              <Link to={"/productdate/" + article._id} className="btn btn-dark mt-2">Ver más</Link>
              
              <div className="clearfix"></div>
            
            </article>
            <hr/>
            </div>
                
                ))}

          
        </section>
      </div>

      
     

      
    </div>
   
    );
  }
 
}