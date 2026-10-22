package com.devtoolkit.service.tools;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UuidService {

    public List<String> generateV4(int count) {
        if (count < 1 || count > 500) {
            throw new IllegalArgumentException("Count must be between 1 and 500");
        }
        
        List<String> uuids = new ArrayList<>(count);
        for (int i = 0; i < count; i++) {
            uuids.add(UUID.randomUUID().toString());
        }
        return uuids;
    }
}