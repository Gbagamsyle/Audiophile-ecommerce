'use client';
import styles from './Categories.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';
import headphonesImage from '../../assets/shared/desktop/image-category-thumbnail-headphones.png';
import speakersImage from '../../assets/shared/desktop/image-category-thumbnail-speakers.png';
import earphonesImage from '../../assets/shared/desktop/image-category-thumbnail-earphones.png';

const Categories = () => {
  const categories = [
    {
      title: 'HEADPHONES',
      image: headphonesImage,
      link: '/headphones'
    },
    {
      title: 'SPEAKERS',
      image: speakersImage,
      link: '/speakers'
    },
    {
      title: 'EARPHONES',
      image: earphonesImage,
      link: '/earphones'
    }
  ];

  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;