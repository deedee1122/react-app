import React from "react";
import { useParams } from "react-router";

const DetailPage = (props) => {
  let id = useParams();
  return (
    <div>
      <h1>Detail Page {`${props.location.pathname}`}</h1>
    </div>
  );
};

export default DetailPage;
