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
  const [varMapping, setVarMapping] = useState('');
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
    <div style={{ color: 'white' }}>
      <h1>{pluginId} HomePage</h1>
      <br />

      <form onSubmit={convertToJS}>
        <h3>Enter Excel formula</h3>
        <br />
        <input type='text' name="query" onChange={(e) => setFormulaInExcel(e.target.value)} value={formulaInExcel} />
        <button type='submit'>Enter</button>
      </form>

      <br />

      <div>
        <h3>JS formula</h3>
        <br />
        <text id="js-formula-box">{formulaInJS}</text>
      </div>

      <br />

      <div>
        <h3>JS Identifiers</h3>
        <br />
        <text>{identifiersInJS}</text>
      </div>

      <br />

      <form onSubmit={renameVarsInJS}>
        <h3>Rename identifiers</h3>
        <br />
        <input onChange={(e) => setVarMapping(e.target.value)} value={varMapping} />
        <button type='submit'>Enter</button>
      </form>

      <br />

      <div>
        <h3>Refactored JS formula</h3>
        <br />
        <text>{refactoredFormulaInJS}</text>
      </div>

    </div>
  );
};

export default HomePage;
