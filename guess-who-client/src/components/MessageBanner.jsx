export default function MessageBanner({ type, message }) {
  return <div className={`message-banner ${type}`}>{message}</div>;
}
