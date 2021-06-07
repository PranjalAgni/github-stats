import React from 'react';
import { GithubStats } from '../../interfaces/';

interface IStatsProps {
  githubStats: GithubStats[];
}

const Stats = ({ githubStats }: IStatsProps) => {
  return (
    <div>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">URL</th>
            <th scope="col">Commits</th>
          </tr>
        </thead>
        <tbody>
          {githubStats.map(({ name, description, language, commits }, idx) => (
            <tr key={idx} className="table-primary">
              <td>{name}</td>
              <td>{description || '-'}</td>
              <td>{language || '-'}</td>
              <td>{commits || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
