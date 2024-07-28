import Flex from "@components/Flex/Flex";
import SectionTitle from "@components/SectionTitle/SectionTitle";
import React from "react";

function Location() {
  const latitude = 32.794;
  const longitude = 34.9896;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.1}%2C${latitude - 0.1}%2C${
    longitude + 0.1
  }%2C${latitude + 0.1}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  return (
    <>
      <Flex>
        <SectionTitle title="Location" />
      </Flex>
      <div style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}>
        <iframe
          title="Haifa Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={mapUrl}></iframe>
      </div>
    </>
  );
}

export default Location;
