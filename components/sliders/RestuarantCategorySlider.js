import { Fragment, useState, useEffect } from "react";
import { FlatList, HStack } from "native-base";
import { RestuarantCategorCard } from "../general";
import { SectionTitle } from "../headings";
import { categoryData } from "../../constants/mock";

const RestuarantCategorySlider = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <Fragment>
      <SectionTitle title="Browse by category" path="" />
      <HStack justifyContent="space-between" bg="white.500" py={2}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={categoryData}
          keyExtractor={(item) => item?.id}
          horizontal
          renderItem={({ item }) => (
            <RestuarantCategorCard
              title={item?.name}
              icon={item?.icon}
              isLoading={isLoading}
            />
          )}
        />
      </HStack>
    </Fragment>
  );
};

export default RestuarantCategorySlider;
