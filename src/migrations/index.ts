import * as migration_20260729_121816 from './20260729_121816';

export const migrations = [
  {
    up: migration_20260729_121816.up,
    down: migration_20260729_121816.down,
    name: '20260729_121816'
  },
];
