export default function StackingSections({ children }) {
  const childArray = Array.isArray(children) ? children : [children];

  return <main className="bm-main">{childArray}</main>;
}
