import React from 'react' 
import axios from 'axios'

export default function News(){
  let [news, setNews] = React.useState(null)
 
  if(!news){
    axios('http://194.163.157.237:8000/api/post_view/')
      .then(result => {
        console.log(result)
        setNews(result.data[0].post_body)
      })
  }

  return(
    <div>
      {news &&
        <div style={{color: 'white'}} dangerouslySetInnerHTML={ {__html: news.replace('src="', 'src="http://194.163.157.237:8000')} } />
      }
    </div>
  )
}