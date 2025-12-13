import { useState, useEffect } from "react";
import "./Elements.css";

export function Elements() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData(["Element 1", "Element 2", "Element 3", "Element 4"]);
    }, 2_000);
  }, []);

  return (
    <div>
      <h1>Elements Component</h1>
      <div title="elements-demo">
        {data && (
          <ul>
            {data.map((item) => (
              <div key={item} className="box">
                {item}
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
