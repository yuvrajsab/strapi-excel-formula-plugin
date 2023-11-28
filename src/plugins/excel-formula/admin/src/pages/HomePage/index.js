/*
 *
 * HomePage
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { convertToJSFormula, getIdentifiersInJS, renameIdentifiersInJS } from '../../utils/excelFormulaToJS';

const HomePage = () => {

  const [formulaInExcel, setFormulaInExcel] = useState("");
  const [formulaInJS, setFormulaInJS] = useState("");
  const [identifiersInJS, setIdentifiersInJS] = useState("");
  const [varMapping, setVarMapping] = useState('{}');
  const [refactoredFormulaInJS, setRefactoredFormulaInJS] = useState("");

  function convertToJS(e) {
    e.preventDefault();
    let JSFormula = convertToJSFormula(formulaInExcel);

    const identifiers = getIdentifiersInJS(JSFormula);

    setIdentifiersInJS(identifiers.join(','));

    setFormulaInJS(JSFormula)
  }

  function renameVarsInJS(e) {
    e.preventDefault();
    const mapping = JSON.parse(varMapping);
    const refactoredFormula = renameIdentifiersInJS(formulaInJS, mapping);
    setRefactoredFormulaInJS(refactoredFormula);
  }

  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <h1>{pluginId} HomePage</h1>
      <br />

      <form onSubmit={convertToJS} style={{border: '1px solid white', padding: '10px'}}>
        <h3>Enter Excel formula</h3>
        <br />
        <input type='text' name="query" onChange={(e) => setFormulaInExcel(e.target.value)} value={formulaInExcel} />
        <button type='submit'>Enter</button>
      </form>

      <br />

      <div style={{border: '1px solid white', padding: '10px'}}>
        <h3>JS formula</h3>
        <br />
        <div>{formulaInJS}</div>
      </div>

      <br />

      <div style={{border: '1px solid white', padding: '10px'}}>
        <h3>JS Identifiers</h3>
        <br />
        <div>{identifiersInJS}</div>
      </div>

      <br />

      <form onSubmit={renameVarsInJS} style={{border: '1px solid white', padding: '10px'}}>
        <h3>Rename identifiers</h3>
        <br />
        <textarea onChange={(e) => setVarMapping(e.target.value)}>{varMapping}</textarea>
        <button type='submit'>Enter</button>
      </form>

      <br />

      <div style={{border: '1px solid white', padding: '10px'}}>
        <h3>Refactored JS formula</h3>
        <br />
        <div>{refactoredFormulaInJS}</div>
      </div>

    </div>
  );
};

export default HomePage;
