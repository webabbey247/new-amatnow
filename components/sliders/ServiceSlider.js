import { useState, useEffect } from "react";
import { FlatList, HStack } from "native-base";
import { servicesData } from "../../constants/mock";
import { ServicesCard } from "../general";

const ServiceSlider = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <HStack
      justifyContent="space-around"
      alignItems="space-around"
      py={2}
      mb={3}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={servicesData}
        keyExtractor={(item) => item?.id}
        horizontal
        renderItem={({ item }) => (
          <ServicesCard
            title={item?.name}
            icon={item?.icon}
            path={item.path}
            loading={isLoading}
          />
        )}
      />
    </HStack>
  );
};

export default ServiceSlider;
