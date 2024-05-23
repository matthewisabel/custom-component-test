import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
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
import CustomNode from './CustomNode';

import 'reactflow/dist/style.css';
import './overview.css';

const minimapStyle = {
  height: 120,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge
};

const nodeTypes = {
  custom: CustomNode,
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

export const SupportTree: FC = () => {
  const [playbook] = Retool.useStateObject({
    name: 'playbook', 
    initialValue: { nodes: [], edges: [] }
  });

  const [selectedNode, setSelectedNode] = Retool.useStateObject({
    name: 'selectedNode',
    initialValue: { id: '', data: {} },
    inspector: 'hidden'
  });

  const closeTicket = Retool.useEventCallback({ name: "closeTicket" });
  const slackNotification = Retool.useEventCallback({ name: "slackNotification" });
  const generateAI = Retool.useEventCallback({ name: "generateAI" });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    if (playbook.nodes && playbook.edges) {
      setNodes(playbook.nodes);
      setEdges(playbook.edges);
    } else {
      setNodes(initialNodes);
      setEdges(initialEdges);
    }

    if (reactFlowInstance) {
      reactFlowInstance.fitView(); 
    }
  }, [playbook, setNodes, setEdges, reactFlowInstance]);

  const handleClick = useCallback((event, node) => {
    setSelectedNode(node);
    const functionMap = {
      closeTicket: closeTicket,
      slackNotification: slackNotification,
      generateAI: generateAI,
    };

    const func = functionMap[node.data.action];
    if (func) {
      func();
    } else {
      console.warn(`Unknown function: ${node.data.action}`);
    }
  }, [closeTicket, slackNotification, generateAI])



  const onLoad = useCallback((instance) => {
    setReactFlowInstance(instance);
    instance.fitView();
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={handleClick}
      onLoad={onLoad}
      fitView
    >
      <Controls />
      <Background color="#D3D3D3" gap={16} />
    </ReactFlow>
  );
};
