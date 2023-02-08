import Chapter from 'models/Chapter'

export default function (toc?: readonly Chapter[]) {
  return (toc || []).reduce(
    (acc, item) => [
      ...acc,
      item,
      ...(item.subchapters.reduce(
        (acc, item) => [...acc, item, ...(item.subchapters || [])],
        [] as Chapter[]
      ) || []),
    ],
    [] as Chapter[]
  )
}
