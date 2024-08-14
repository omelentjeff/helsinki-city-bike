package com.omelentjeff.citybike.repository;

import com.omelentjeff.citybike.entity.Station;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
    Page<Station> findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(String name, String category, Pageable pageable);

}
