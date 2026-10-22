package com.devtoolkit.service.tools;

import com.github.vertical_blank.sqlformatter.SqlFormatter;
import org.springframework.stereotype.Service;

@Service
public class SqlService {

    public String format(String sql) {
        if (sql == null || sql.isBlank()) {
            return sql;
        }
        try {
            return SqlFormatter.format(sql);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to format SQL: " + e.getMessage(), e);
        }
    }
}