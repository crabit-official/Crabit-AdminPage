import { CHALLENGE_CATEGORY } from '../../enum';
import Filter from '../Filter/Filter';

const filters = [
  {
    key: CHALLENGE_CATEGORY.STUDYING,
    text: '공부',
  },
  {
    key: CHALLENGE_CATEGORY.EXERCISE,
    text: '운동',
  },
  {
    key: CHALLENGE_CATEGORY.READING,
    text: '독서',
  },
  {
    key: CHALLENGE_CATEGORY.NEWSPAPER,
    text: '신문읽기',
  },
  {
    key: CHALLENGE_CATEGORY.COPYING,
    text: '글쓰기',
  },
  {
    key: CHALLENGE_CATEGORY.DIARY_WRITING,
    text: '일기쓰기',
  },
  {
    key: CHALLENGE_CATEGORY.LIFESTYLE_HABITS,
    text: '생활습관',
  },
  {
    key: CHALLENGE_CATEGORY.ETC,
    text: '기타',
  },
] as const;

type Filter = (typeof filters)[number]['key'];

interface IFilterListProps {
  active: Filter;
  onChange: (value: Filter) => void;
}

export default function FilterList({ active, onChange }: IFilterListProps) {
  return (
    <div className='flex justify-center gap-x-25 w-full'>
      {filters.map((filter) => (
        <Filter
          key={filter.key}
          active={active === filter.key}
          onClick={() => onChange(filter.key)}
        >
          <h1>{filter.text}</h1>
        </Filter>
      ))}
    </div>
  );
}
