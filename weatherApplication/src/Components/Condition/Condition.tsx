import "./Condition.scss";

type ConditionProps = {
  text: string;
  icon: string;
  code: number;
};

const Condition = ({ code, icon, text }: ConditionProps) => {
  return (
    <div>
      <img src={icon} />
      <p>{text}</p>
    </div>
  );
};

export default Condition;
