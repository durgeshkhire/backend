package com.onlyBags.backend.modules.bags;

import com.onlyBags.backend.entity.Bags;
import com.onlyBags.backend.entity.enums.Color;
import com.onlyBags.backend.entity.enums.Tag;
import com.onlyBags.backend.entity.enums.Type;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BagsRepository extends JpaRepository<Bags, UUID> {

    List<Bags> findByType(Type type);

    List<Bags> findByTags(Tag tags);

    List<Bags> findByColor(Color color);
}
