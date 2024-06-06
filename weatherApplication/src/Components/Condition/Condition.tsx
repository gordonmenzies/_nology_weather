type ConditionProps = {
  text: string;
  icon: string;
  code: number;
};

const Condition = ({ icon, text }: ConditionProps) => {
  return (
    <div>
      <img src={icon} />
      <p>{text}</p>
    </div>
  );
};

export default Condition;
