import React from "react";

const Youtube = ({
  id,
  title,
  ...rest
}: {
  id: string;
  title: string;
  [key: string]: any;
}) => {
  const src = `https://www.youtube.com/embed/${id}`;

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg">
      <iframe
        title={title}
        src={src}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        {...rest}
      />
    </div>
  );
};

export default Youtube;
