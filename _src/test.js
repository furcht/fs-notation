const setValueToField = (fields) => {
    const reducer = (prev, curr, index, arr) => ({ [curr]: (index + 1 < arr.length) ? prev : {} });
    return fields.reduceRight(reducer, {});
  };
  
  let testArray = [
    [ 'templates', 'components' ],
    [ 'templates', 'components', 'slider' ],
    [ 'templates', 'elements' ],
    [ 'templates', 'elements', 'button' ],
    [ 'templates', 'elements', 'input' ]
  ];
  
  
  let obj = {};
  let tempObj = {}
  
  //-- First Array [ 'templates', 'components' ]
  //- templates
  if(!obj['templates']) obj['templates'] = {};
  tmpObj = obj["templates"];
  
  //- components
  if(!tmpObj["components"]) tmpObj["components"] = {};
  tmpObj = tmpObj["components"];
  
  
  
  //-- Second Array [ 'templates', 'components', 'slider' ]
  tmpObj = obj;
  //- templates
  if(!tmpObj["templates"]) tmpObj["templates"] = {};
  tmpObj = tmpObj["templates"];
  
  //- components
  if(!tmpObj["components"]) tmpObj["components"] = {};
  tmpObj = tmpObj["components"];
  
  //- slider
  if(!tmpObj["slider"]) tmpObj["slider"] = {};
  tmpObj = tmpObj["slider"];
  
  
  
  //-- Third Array [ 'templates', 'elements' ]
  tmpObj = obj;
  //- templates
  if(!tmpObj["templates"]) tmpObj["templates"] = {};
  tmpObj = tmpObj["templates"];
  
  //- elements
  if(!tmpObj["elements"]) tmpObj["elements"] = {};
  tmpObj = tmpObj["elements"];





  //-- Fourth Array [ 'templates', 'elements', 'button' ]
  tmpObj = obj;
  //- templates
  if(!tmpObj["templates"]) tmpObj["templates"] = {};
  tmpObj = tmpObj["templates"];
  
  //- elements
  if(!tmpObj["elements"]) tmpObj["elements"] = {};
  tmpObj = tmpObj["elements"];

  //- button
  if(!tmpObj["button"]) tmpObj["button"] = {};
  tmpObj = tmpObj["button"];



   //-- Fifth Array [ 'templates', 'elements', 'input' ]
   tmpObj = obj;
   //- templates
   if(!tmpObj["templates"]) tmpObj["templates"] = {};
   tmpObj = tmpObj["templates"];
   
   //- elements
   if(!tmpObj["elements"]) tmpObj["elements"] = {};
   tmpObj = tmpObj["elements"];

   //- input
   if(!tmpObj["input"]) tmpObj["input"] = {};
   tmpObj = tmpObj["input"];
  
  console.log(obj);
  
  