package com.omelentjeff.citybike.repository;

import com.omelentjeff.citybike.entity.Journey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JourneyRepository extends JpaRepository<Journey, Integer>  {
}
