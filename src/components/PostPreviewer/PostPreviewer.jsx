import Replacer from "../Replacer/Replacer"

const PostPreviewer = ({ text }) => {
  return (<>
    {text ?
      <div>
        <div className="preview-tip">
          <small className="tone-down">Preview:</small>
        </div>
        <div className="preview-box">
          <Replacer text={text} clickableMention={false} />
        </div>
        <div className="preview-tip">
          You can use <strong>@mentions</strong>
          , **<strong>bold</strong>**
          , and __<em>italics</em>__.
        </div>
      </div>
      :
      null
    }
  </>)
}

export default PostPreviewer