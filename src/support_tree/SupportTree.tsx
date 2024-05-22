import React, { FC, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  EdgeTypes,
  Edge, 
  Controls,
  Background,
  useNodesState,
  useEdgesState
} from 'reactflow';
import { Retool } from '@tryretool/custom-component-support'
import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import CustomEdge from './CustomEdge';

import 'reactflow/dist/style.css';
import './overview.css';

const minimapStyle = {
  height: 120,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

export const SupportTree: FC = () => {
  const [playbook] = Retool.useStateObject({
    name: 'playbook', 
    initialValue: { nodes: [], edges: [] }
  });

  const onClick = Retool.useEventCallback({ name: "foo" });
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    if (playbook.nodes && playbook.edges) {
      setNodes(playbook.nodes);
      setEdges(playbook.edges);
    }
  }, [playbook, setNodes, setEdges]);

  const handleClick = useCallback((event, nodeId) => {
    console.log(event, nodeId);
    onClick();
  }, [onClick])

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={handleClick}
      onInit={onInit} // Ensure you define what you want to happen on init or remove if not needed.
      fitView
    >
      <Controls />
      <Background color="#D3D3D3" gap={16} />
    </ReactFlow>
  );
};
