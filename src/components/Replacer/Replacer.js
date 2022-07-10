import { useNavigate } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

const Replacer = ({ text, clickableMention = true }) => {

  const navigate = useNavigate();

  text = reactStringReplace(text, /\*\*(.{1,}?)\*\*/g, (match, i) => (
    <strong key={match + i}>{match}</strong>
  ));

  text = reactStringReplace(text, /__(.{1,}?)__/g, (match, i) => (
    <em key={match + i}>{match}</em>
  ));

  if (clickableMention) {
    text = reactStringReplace(text, /(@.{3,40}<[0-9a-f]{24}>)/gi, (match, i) => {
      match.match(/@(.{3,40})<([0-9a-f]{24})>/gi);
      const username = <><strong>{RegExp.$1}</strong></>;
      const userId = RegExp.$2;
      return (
        <span
          className="mention"
          key={match + i}
          onClick={(ev) => {
            ev.preventDefault();
            navigate('/user/' + userId);
          }}>
          @{username}
        </span>
      )
    });

  } else {
    text = reactStringReplace(text, /(@.{3,40}<[0-9a-f]{24}>)/gi, (match, i) => {
      match.match(/@(.{3,40})<([0-9a-f]{24})>/gi);
      const username = <><strong>{RegExp.$1}</strong></>;
      return (
        <span key={match + i}>
          @{username}
        </span>
      )
    });
  }


  return <>{text}</>;
}

export default Replacer