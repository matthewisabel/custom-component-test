// CustomNode.js
import { Handle } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <div>{data.label}</div>
      {data.action && (
        <button onClick={data.action} style={{   
            border: '1px solid #e0e0e0',
            borderRadius: '2px',
            padding: '2px 2px',
            fontSize: '10px',
            cursor: 'pointer',
            outline: 'none',
            marginTop: '4px' 
        }}>
          ✨ AI reply →
        </button>
      )}
      <Handle type="target" position="top" style={{ background: '#555' }} />
      <Handle type="source" position="bottom" style={{ background: '#555' }} />
    </div>
  );
};

export default CustomNode;