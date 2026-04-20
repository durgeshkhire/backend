package com.onlyBags.backend.modules.bags;

import com.onlyBags.backend.entity.Bags;
import com.onlyBags.backend.entity.enums.Color;
import com.onlyBags.backend.entity.enums.Tag;
import com.onlyBags.backend.entity.enums.Type;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BagsService {

    private final BagsRepository bagsRepository;

    public Bags addBag(Bags bags){

        return bagsRepository.save(bags);

    }

    public List<Bags> getAllBags(){
        return bagsRepository.findAll();
    }

    public Bags getBagById(UUID id) {
        return bagsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bag not found"));
    }

    public Bags updateBag(UUID id, Bags updatedBag) {
        Bags bag = getBagById(id);

        bag.setNameOfBag(updatedBag.getNameOfBag());
        bag.setDescription(updatedBag.getDescription());
        bag.setBrand(updatedBag.getBrand());
        bag.setPrice(updatedBag.getPrice());
        bag.setType(updatedBag.getType());
        bag.setTags(updatedBag.getTags());
        bag.setStock(updatedBag.getStock());
        bag.setImageUrl(updatedBag.getImageUrl());
        bag.setColor(updatedBag.getColor());

        return bagsRepository.save(bag);
    }

    public void deleteBag(UUID id) {
        bagsRepository.deleteById(id);
    }

    // 🔍 Filters
    public List<Bags> getByType(Type type) {
        return bagsRepository.findByType(type);
    }

    public List<Bags> getByTag(Tag tag) {
        return bagsRepository.findByTags(tag);
    }

    public List<Bags> getByColor(Color color) {
        return bagsRepository.findByColor(color);
    }

}
