import React from "react";
import { createRoot } from 'react-dom/client';
import Editor from "./components/editor";

const root = createRoot(document.getElementById('root'));
root.render(<Editor />);