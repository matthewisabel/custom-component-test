import React, { FC, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { Retool } from '@tryretool/custom-component-support'
import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import CustomNode from './CustomNode';

import 'reactflow/dist/style.css';
import './overview.css';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reacftFlowInstance) => console.log('flow loaded:', reactFlowInstance);

export const SupplyChain: FC = () => {
  const [journey] = Retool.useStateObject({
    name: 'journey', 
    initialValue: { nodes: [], edges: [] }
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    if (journey.nodes && journey.edges) {
      setNodes(journey.nodes);
      setEdges(journey.edges);
    }
  }, [journey, setNodes, setEdges]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit} // Ensure you define what you want to happen on init or remove if not needed.
      fitView
      attributionPosition="top-right"
      // Ensure nodeTypes is correctly defined elsewhere in your code.
      nodeTypes={nodeTypes}
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};
