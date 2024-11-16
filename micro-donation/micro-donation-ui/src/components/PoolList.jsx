import PoolCard from "./PoolCard";

const PoolList = ({ pools }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} />
        ))}
    </div>
);

export default PoolList;
