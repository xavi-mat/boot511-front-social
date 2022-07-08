import Replacer from "../Replacer/Replacer"

const PostPreviewer = ({text}) => {
  return (<>
    {text ?
      <div>
        <div className="preview-tip">
          <small className="tone-down">Preview:</small>
        </div>
        <div className="preview-box">
          <Replacer text={text} />
        </div>
        <pre className="preview-tip">You can use **bold** and __italics__ markdown.</pre>

      </div>
      :
      null
    }
  </>)
}

export default PostPreviewer