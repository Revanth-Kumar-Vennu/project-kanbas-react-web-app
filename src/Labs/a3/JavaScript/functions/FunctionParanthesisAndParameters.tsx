function FunctionParanthesisAndParameters() {
 
const square  = (a: number) => a * a;
const plusOne = (a: number) => a + 1;
const twoSquared = square(2);
const threePlusOne = plusOne(3);

return (
    <>
    <h3>Paranthesis and Parameters</h3>
    twoSquared = {twoSquared}<br />
    square = {square(2)}<br />
    threePlusOne = {threePlusOne}<br />
    plusOne = {plusOne(3)}<br />
    
   
    </>
)
}

export default FunctionParanthesisAndParameters;