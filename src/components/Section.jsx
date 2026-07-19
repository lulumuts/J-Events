export default function Section({
  children,
  className = '',
  id,
  as: Tag = 'div',
}) {
  return (
    <Tag id={id} className={`bm-section ${className}`.trim()}>
      {children}
    </Tag>
  );
}
